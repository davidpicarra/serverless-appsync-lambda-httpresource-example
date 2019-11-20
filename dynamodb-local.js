const emulator = require('@conduitvc/dynamodb-emulator/client')

async function main() {
  console.log('Starting systems...')
  const emu = await emulator.launch()
  emulator.getClient(emu)
  console.log('All systems go!')
  process.exit()
}

main()
