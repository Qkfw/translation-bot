import { reply_dc, start } from '../messages'
import type { BotType } from '../type'

export function controller(bot: BotType) {
  return {
    start: start.bind(bot),
    reply_dc: reply_dc.bind(bot),
  }
}
