import { BotType } from '../type'
import { GTR } from '../lib/translation'

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

export function echo(this: BotType) {
  this.on('message:text', async (ctx) => {
    await ctx.reply(ctx.message.text)
  })
}

export function translate_message(this: BotType) {
  const gtr = new GTR()
  this.on('message:text', async (ctx) => {
    const text = ctx.message.text
    const { trans } = await gtr.translate(text, { targetLang: 'en' })
    await ctx.reply(trans, { reply_to_message_id: ctx.message.message_id })
  })
}

export function clear_bilibili_tracked(this: BotType) {
  this.on('message:entities:url', async (ctx) => {
    const links = ctx.entities('url')
    let message = ctx.message.text,
      hasBilibili = false

    for (const { text } of links) {
      if (!text.includes('b23.tv') && !text.includes('bilibili.com')) continue
      hasBilibili = true
      let source = text
      if (text.includes('b23.tv')) {
        const res = await fetch(text, { redirect: 'manual' })
        source = res.headers.get('location') ?? 'undefined'
      }

      const search = new URL(source).search
      source = source.replace(search, '') // remove search params
      message = message.replace(text, source) // replace url
    }
    try {
      // 没有跟踪链接就直接返回
      if (!hasBilibili) return
      await ctx.reply(message, {
        reply_to_message_id: ctx.message.message_id,
      })
      await ctx.deleteMessage()
    } catch (e) {
      console.error(e)
    }
  })
}
