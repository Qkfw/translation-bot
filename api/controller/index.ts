import { reply_dc, start, translate_message, echo } from '../messages'
import type { BotType } from '../type'

export function controller(bot: BotType) {
  return {
    start: start.bind(bot),
    reply_dc: reply_dc.bind(bot),
    translate_message: translate_message.bind(bot),
    echo: echo.bind(bot),
  }
}
