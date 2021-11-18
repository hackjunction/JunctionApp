/** Gavel reviewing algorithm configuration options - don't change unless you really know what you're doing! */

const Settings = {
    /** Gavel algorithm math constants */
    ALPHA_PRIOR: 10.0,
    BETA_PRIOR: 1.0,
    MU_PRIOR: 0.0,
    SIGMA_SQ_PRIOR: 1.0,
    GAMMA: 0.1,
    LAMBDA: 1.0,
    KAPPA: 0.0001,
    EPSILON: 0.25,
    /** How long must an annotator wait between votes? */
    ANNOTATOR_WAIT_SECONDS: 45,
    /** How long after being assigned a project is an annotator considered inactive? */
    ANNOTATOR_TIMEOUT_MINS: 5,
    /** How many views must a project have to no longer be automatically prioritised? */
    ITEM_MIN_VIEWS: 5,
}

module.exports = Settings
