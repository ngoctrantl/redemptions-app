const logDeploy = require('@aragon/os/scripts/helpers/deploy-logger')
const getAccounts = require('./helpers/get-accounts')

const globalArtifacts = this.artifacts // Not injected unless called directly via truffle
const globalWeb3 = this.web3 // Not injected unless called directly via truffle

const defaultOwner = process.env.OWNER

module.exports = async (
  truffleExecCallback,
  {
    artifacts = globalArtifacts,
    web3 = globalWeb3,
    owner = defaultOwner,
    verbose = true,
  } = {}
) => {
  const log = (...args) => {
    if (verbose) {
      console.log(...args)
    }
  }

  if (!owner) {
    const accounts = await getAccounts(web3)
    owner = accounts[0]
    log(
      `No OWNER environment variable passed, setting ENS owner to provider's account: ${owner}`
    )
  }

  const BasicToken = artifacts.require('BasicErc20')

  const valutAddress = '0x..'

  log('Deploying BasicTokens...')
  const token0 = await BasicToken.new()
  const token1 = await BasicToken.new()
  await logDeploy(token0, { verbose })

  // const receipt = await factory.newENS(owner)

  await logDeploy(token1, { verbose })

  // const ensAddr = receipt.logs.filter(l => l.event == 'DeployENS')[0].args.ens
  // log('====================')
  // log('Deployed ENS:', ensAddr)

  // log(ensAddr)

  if (typeof truffleExecCallback === 'function') {
    // Called directly via `truffle exec`
    truffleExecCallback()
  } else {
    return {
      // ens: ENS.at(ensAddr),
      // ensFactory: factory,
    }
  }
}
