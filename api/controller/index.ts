import { reply_dc, start, translate_message, echo } from '../messages'
import type { BotType } from '../type'
import { clear_bilibili_tracked } from '../messages/index'

export function controller(bot: BotType) {
  return {
    start: start.bind(bot),
    reply_dc: reply_dc.bind(bot),
    translate_message: translate_message.bind(bot),
    echo: echo.bind(bot),
    clear_bilibili_tracked: clear_bilibili_tracked.bind(bot),
  }
}
