from aiogram import Bot, Dispatcher, types
from aiogram.client.default import DefaultBotProperties
from aiogram.dispatcher.middlewares.base import BaseMiddleware
from aiogram.enums import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import Message

from config import TOKEN

bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp = Dispatcher(storage=MemoryStorage())

# class CustomMiddleware(BaseMiddleware):
#     async def __call__(self, handler, event, data):
#         if isinstance(event, Message):
#             print(f"Unhandled message: {event.text}")
#         return await handler(event, data)
#
# dp.message.middleware(CustomMiddleware())
# dp.middleware.setup(LoggingMiddleware())

