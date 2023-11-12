import { webhookCallback } from 'grammy'
import { bot } from './core'
import { controller } from './controller'

const instance = controller(bot)
instance.start()
// instance.reply_dc()
instance.translate_message()

export const config = { runtime: 'edge' }
export default webhookCallback(bot, 'std/http')
