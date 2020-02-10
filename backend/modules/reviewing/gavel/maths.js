//Should be equivalent to scipy.special.psi
const digamma = require('@stdlib/math/base/special/digamma')

//Should be equivalent to scipy.special.betaln
const betaln = require('@stdlib/math/base/special/betaln')

//Should be equivalent to numpy.exp
const exp = require('@stdlib/math/base/special/exp')

//Should be equivalent to numpy.log
const log = require('@stdlib/math/base/special/ln')

const { KAPPA, GAMMA } = require('./settings')

// Ok here we go :DD
const Maths = {
    divergenceGaussian: (mu_1, sigma_sq_1, mu_2, sigma_sq_2) => {
        const ratio = sigma_sq_1 / sigma_sq_2

        return (
            Math.pow(mu_1 - mu_2, 2) / (2 * sigma_sq_2) +
            (ratio - 1 - log(ratio)) / 2
        )
    },

    divergenceBeta: (alpha_1, beta_1, alpha_2, beta_2) => {
        return (
            betaln(alpha_2, beta_2) -
            betaln(alpha_1, beta_1) +
            (alpha_1 - alpha_2) * digamma(alpha_1) +
            (beta_1 - beta_2) * digamma(beta_1) +
            (alpha_2 - alpha_1 + beta_2 - beta_1) * digamma(alpha_1 + beta_1)
        )
    },

    update: (
        alpha,
        beta,
        mu_winner,
        sigma_sq_winner,
        mu_loser,
        sigma_sq_loser
    ) => {
        const updated_annotator = Maths.updatedAnnotator(
            alpha,
            beta,
            mu_winner,
            sigma_sq_winner,
            mu_loser,
            sigma_sq_loser
        )
        const updated_mus = Maths.updatedMus(
            alpha,
            beta,
            mu_winner,
            sigma_sq_winner,
            mu_loser,
            sigma_sq_loser
        )
        const updated_sigma_sqs = Maths.updatedSigmaSqs(
            alpha,
            beta,
            mu_winner,
            sigma_sq_winner,
            mu_loser,
            sigma_sq_loser
        )

        return {
            updated_alpha: updated_annotator.updated_alpha,
            updated_beta: updated_annotator.updated_beta,
            updated_mu_winner: updated_mus.updated_mu_winner,
            updated_mu_loser: updated_mus.updated_mu_loser,
            updated_sigma_sq_winner: updated_sigma_sqs.updated_sigma_sq_winner,
            updated_sigma_sq_loser: updated_sigma_sqs.updated_sigma_sq_loser,
        }
    },

    expectedInformationGain: (
        alpha,
        beta,
        mu_a,
        sigma_sq_a,
        mu_b,
        sigma_sq_b
    ) => {
        const updated_annotator = Maths.updatedAnnotator(
            alpha,
            beta,
            mu_a,
            sigma_sq_a,
            mu_b,
            sigma_sq_b
        )
        const updated_mus = Maths.updatedMus(
            alpha,
            beta,
            mu_a,
            sigma_sq_a,
            mu_b,
            sigma_sq_b
        )
        const updated_sigma_sqs = Maths.updatedSigmaSqs(
            alpha,
            beta,
            mu_a,
            sigma_sq_a,
            mu_b,
            sigma_sq_b
        )
        const updated_annotator_2 = Maths.updatedAnnotator(
            alpha,
            beta,
            mu_b,
            sigma_sq_b,
            mu_a,
            sigma_sq_a
        )
        const updated_mus_2 = Maths.updatedMus(
            alpha,
            beta,
            mu_b,
            sigma_sq_b,
            mu_a,
            sigma_sq_a
        )
        const updated_sigma_sqs_2 = Maths.updatedSigmaSqs(
            alpha,
            beta,
            mu_b,
            sigma_sq_b,
            mu_a,
            sigma_sq_a
        )

        const alpha_1 = updated_annotator.updated_alpha
        const beta_1 = updated_annotator.updated_beta
        const c = updated_annotator.c
        const mu_a_1 = updated_mus.updated_mu_winner
        const mu_b_1 = updated_mus.updated_mu_loser
        const sigma_sq_a_1 = updated_sigma_sqs.updated_sigma_sq_winner
        const sigma_sq_b_1 = updated_sigma_sqs.updated_sigma_sq_loser
        const prob_a_ranked_above = c
        const alpha_2 = updated_annotator_2.updated_alpha
        const beta_2 = updated_annotator_2.updated_beta
        const mu_b_2 = updated_mus_2.updated_mu_winner
        const mu_a_2 = updated_mus_2.updated_mu_loser
        const sigma_sq_b_2 = updated_sigma_sqs_2.updated_sigma_sq_winner
        const sigma_sq_a_2 = updated_sigma_sqs_2.updated_sigma_sq_loser

        return (
            prob_a_ranked_above *
                (Maths.divergenceGaussian(
                    mu_a_1,
                    sigma_sq_a_1,
                    mu_a,
                    sigma_sq_a
                ) +
                    Maths.divergenceGaussian(
                        mu_b_1,
                        sigma_sq_b_1,
                        mu_b,
                        sigma_sq_b
                    ) +
                    GAMMA *
                        Maths.divergenceBeta(alpha_1, beta_1, alpha, beta)) +
            (1 - prob_a_ranked_above) *
                (Maths.divergenceGaussian(
                    mu_a_2,
                    sigma_sq_a_2,
                    mu_a,
                    sigma_sq_a
                ) +
                    Maths.divergenceGaussian(
                        mu_b_2,
                        sigma_sq_b_2,
                        mu_b,
                        sigma_sq_b
                    ) +
                    GAMMA * Maths.divergenceBeta(alpha_2, beta_2, alpha, beta))
        )
    },

    updatedMus: (
        alpha,
        beta,
        mu_winner,
        sigma_sq_winner,
        mu_loser,
        sigma_sq_loser
    ) => {
        const mult =
            (alpha * exp(mu_winner)) /
                (alpha * exp(mu_winner) + beta * exp(mu_loser)) -
            exp(mu_winner) / (exp(mu_winner) + exp(mu_loser))

        const updated_mu_winner = mu_winner + sigma_sq_winner * mult
        const updated_mu_loser = mu_loser - sigma_sq_loser * mult

        return {
            updated_mu_winner,
            updated_mu_loser,
        }
    },

    updatedSigmaSqs: (
        alpha,
        beta,
        mu_winner,
        sigma_sq_winner,
        mu_loser,
        sigma_sq_loser
    ) => {
        const mult =
            (alpha * exp(mu_winner) * beta * exp(mu_loser)) /
                Math.pow(alpha * exp(mu_winner) + beta * exp(mu_loser), 2) -
            (exp(mu_winner) * exp(mu_loser)) /
                Math.pow(exp(mu_winner) + exp(mu_loser), 2)

        const updated_sigma_sq_winner =
            sigma_sq_winner * Math.max(1 + sigma_sq_winner * mult, KAPPA)
        const updated_sigma_sq_loser =
            sigma_sq_loser * Math.max(1 + sigma_sq_loser * mult, KAPPA)

        return {
            updated_sigma_sq_winner,
            updated_sigma_sq_loser,
        }
    },

    updatedAnnotator: (
        alpha,
        beta,
        mu_winner,
        sigma_sq_winner,
        mu_loser,
        sigma_sq_loser
    ) => {
        const c_1 =
            exp(mu_winner) / (exp(mu_winner) + exp(mu_loser)) +
            (0.5 *
                (sigma_sq_winner + sigma_sq_loser) *
                (exp(mu_winner) *
                    exp(mu_loser) *
                    (exp(mu_loser) - exp(mu_winner)))) /
                Math.pow(exp(mu_winner) + exp(mu_loser), 3)

        const c_2 = 1 - c_1
        const c = (c_1 * alpha + c_2 * beta) / (alpha + beta)

        const expt =
            (c_1 * (alpha + 1) * alpha + c_2 * alpha * beta) /
            (c * (alpha + beta + 1) * (alpha + beta))
        const expt_sq =
            (c_1 * (alpha + 2) * (alpha + 1) * alpha +
                c_2 * (alpha + 1) * alpha * beta) /
            (c * (alpha + beta + 2) * (alpha + beta + 1) * (alpha + beta))

        const variance = expt_sq - Math.pow(expt, 2)
        const updated_alpha = ((expt - expt_sq) * expt) / variance
        const updated_beta = ((expt - expt_sq) * (1 - expt)) / variance

        return {
            updated_alpha,
            updated_beta,
            c,
        }
    },
}

module.exports = Maths
