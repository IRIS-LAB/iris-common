#!groovy

@Library('gie@develop') _

continuousIntegration(
    contextRoot: 'iris-common',
    builder: 'npm',
    authProvider: 'none',
    skipIntegrationTests: false,
    targetedMiddleware: 'APACHE',
    deployer: 'docker_ee',
    performRelease: true
)
