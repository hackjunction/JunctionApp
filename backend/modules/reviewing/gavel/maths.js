// Should be equivalent to scipy.special.psi
const digamma = require('@stdlib/math/base/special/digamma')

// Should be equivalent to scipy.special.betaln
const betaln = require('@stdlib/math/base/special/betaln')

// Should be equivalent to numpy.exp
const exp = require('@stdlib/math/base/special/exp')

// Should be equivalent to numpy.log
const log = require('@stdlib/math/base/special/ln')

const { KAPPA, GAMMA } = require('./settings')

// Ok here we go :DD
const Maths = {
    divergenceGaussian: (mu1, sigmaSq1, mu2, sigmaSq2) => {
        const ratio = sigmaSq1 / sigmaSq2

        return (
            Math.pow(mu1 - mu2, 2) / (2 * sigmaSq2) +
            (ratio - 1 - log(ratio)) / 2
        )
    },

    divergenceBeta: (alpha1, beta1, alpha2, beta2) => {
        return (
            betaln(alpha2, beta2) -
            betaln(alpha1, beta1) +
            (alpha1 - alpha2) * digamma(alpha1) +
            (beta1 - beta2) * digamma(beta1) +
            (alpha2 - alpha1 + beta2 - beta1) * digamma(alpha1 + beta1)
        )
    },

    update: (alpha, beta, muWinner, sigmaSqWinner, muLoser, sigmaSqLoser) => {
        const updatedAnnotator = Maths.updatedAnnotator(
            alpha,
            beta,
            muWinner,
            sigmaSqWinner,
            muLoser,
            sigmaSqLoser
        )
        const updatedMus = Maths.updatedMus(
            alpha,
            beta,
            muWinner,
            sigmaSqWinner,
            muLoser,
            sigmaSqLoser
        )
        const updatedSigmaSqs = Maths.updatedSigmaSqs(
            alpha,
            beta,
            muWinner,
            sigmaSqWinner,
            muLoser,
            sigmaSqLoser
        )

        return {
            updatedAlpha: updatedAnnotator.updatedAlpha,
            updatedBeta: updatedAnnotator.updatedBeta,
            updatedMuWinner: updatedMus.updatedMuWinner,
            updatedMuLoser: updatedMus.updatedMuLoser,
            updatedSigmaSqWinner: updatedSigmaSqs.updatedSigmaSqWinner,
            updatedSigmaSqLoser: updatedSigmaSqs.updatedSigmaSqLoser,
        }
    },

    expectedInformationGain: (alpha, beta, muA, sigmaSqA, muB, sigmaSqB) => {
        const updatedAnnotator = Maths.updatedAnnotator(
            alpha,
            beta,
            muA,
            sigmaSqA,
            muB,
            sigmaSqB
        )
        const updatedMus = Maths.updatedMus(
            alpha,
            beta,
            muA,
            sigmaSqA,
            muB,
            sigmaSqB
        )
        const updatedSigmaSqs = Maths.updatedSigmaSqs(
            alpha,
            beta,
            muA,
            sigmaSqA,
            muB,
            sigmaSqB
        )
        const updatedAnnotator2 = Maths.updatedAnnotator(
            alpha,
            beta,
            muB,
            sigmaSqB,
            muA,
            sigmaSqA
        )
        const updatedMus2 = Maths.updatedMus(
            alpha,
            beta,
            muB,
            sigmaSqB,
            muA,
            sigmaSqA
        )
        const updatedSigmaSqs2 = Maths.updatedSigmaSqs(
            alpha,
            beta,
            muB,
            sigmaSqB,
            muA,
            sigmaSqA
        )

        const alpha1 = updatedAnnotator.updatedAlpha
        const beta1 = updatedAnnotator.updatedBeta
        const { c } = updatedAnnotator
        const muA1 = updatedMus.updatedMuWinner
        const muB1 = updatedMus.updatedMuLoser
        const sigmaSqA1 = updatedSigmaSqs.updatedSigmaSqWinner
        const sigmaSqB1 = updatedSigmaSqs.updatedSigmaSqLoser
        const probARankedAbove = c
        const alpha2 = updatedAnnotator2.updatedAlpha
        const beta2 = updatedAnnotator2.updatedBeta
        const muB2 = updatedMus2.updatedMuWinner
        const muA2 = updatedMus2.updatedMuLoser
        const sigmaSqB2 = updatedSigmaSqs2.updatedSigmaSqWinner
        const sigmaSqA2 = updatedSigmaSqs2.updatedSigmaSqLoser

        return (
            probARankedAbove *
                (Maths.divergenceGaussian(muA1, sigmaSqA1, muA, sigmaSqA) +
                    Maths.divergenceGaussian(muB1, sigmaSqB1, muB, sigmaSqB) +
                    GAMMA * Maths.divergenceBeta(alpha1, beta1, alpha, beta)) +
            (1 - probARankedAbove) *
                (Maths.divergenceGaussian(muA2, sigmaSqA2, muA, sigmaSqA) +
                    Maths.divergenceGaussian(muB2, sigmaSqB2, muB, sigmaSqB) +
                    GAMMA * Maths.divergenceBeta(alpha2, beta2, alpha, beta))
        )
    },

    updatedMus: (
        alpha,
        beta,
        muWinner,
        sigmaSqWinner,
        muLoser,
        sigmaSqLoser
    ) => {
        const mult =
            (alpha * exp(muWinner)) /
                (alpha * exp(muWinner) + beta * exp(muLoser)) -
            exp(muWinner) / (exp(muWinner) + exp(muLoser))

        const updatedMuWinner = muWinner + sigmaSqWinner * mult
        const updatedMuLoser = muLoser - sigmaSqLoser * mult

        return {
            updatedMuWinner,
            updatedMuLoser,
        }
    },

    updatedSigmaSqs: (
        alpha,
        beta,
        muWinner,
        sigmaSqWinner,
        muLoser,
        sigmaSqLoser
    ) => {
        const mult =
            (alpha * exp(muWinner) * beta * exp(muLoser)) /
                Math.pow(alpha * exp(muWinner) + beta * exp(muLoser), 2) -
            (exp(muWinner) * exp(muLoser)) /
                Math.pow(exp(muWinner) + exp(muLoser), 2)

        const updatedSigmaSqWinner =
            sigmaSqWinner * Math.max(1 + sigmaSqWinner * mult, KAPPA)
        const updatedSigmaSqLoser =
            sigmaSqLoser * Math.max(1 + sigmaSqLoser * mult, KAPPA)

        return {
            updatedSigmaSqWinner,
            updatedSigmaSqLoser,
        }
    },

    updatedAnnotator: (
        alpha,
        beta,
        muWinner,
        sigmaSqWinner,
        muLoser,
        sigmaSqLoser
    ) => {
        const c1 =
            exp(muWinner) / (exp(muWinner) + exp(muLoser)) +
            (0.5 *
                (sigmaSqWinner + sigmaSqLoser) *
                (exp(muWinner) *
                    exp(muLoser) *
                    (exp(muLoser) - exp(muWinner)))) /
                Math.pow(exp(muWinner) + exp(muLoser), 3)

        const c2 = 1 - c1
        const c = (c1 * alpha + c2 * beta) / (alpha + beta)

        const expt =
            (c1 * (alpha + 1) * alpha + c2 * alpha * beta) /
            (c * (alpha + beta + 1) * (alpha + beta))
        const exptSq =
            (c1 * (alpha + 2) * (alpha + 1) * alpha +
                c2 * (alpha + 1) * alpha * beta) /
            (c * (alpha + beta + 2) * (alpha + beta + 1) * (alpha + beta))

        const variance = exptSq - Math.pow(expt, 2)
        const updatedAlpha = ((expt - exptSq) * expt) / variance
        const updatedBeta = ((expt - exptSq) * (1 - expt)) / variance

        return {
            updatedAlpha,
            updatedBeta,
            c,
        }
    },
}

module.exports = Maths
