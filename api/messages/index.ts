import { BotType } from '../type'

export function start(this: BotType) {
  this.command('start', async (ctx) => await ctx.reply('Hello, World!'))
}

export function reply_dc(this: BotType) {
  this.on('message:text').hears(/^.*双马尾少女.*$/, async (ctx) => {
    const name = ctx.from.first_name + (ctx.from.last_name ?? '')
    if (name !== 'DCjanus') throw new Error('Not DC')
    await ctx.reply('#DC老湿犯病计数器', {
      reply_to_message_id: ctx.message.message_id,
    })
  })
}
