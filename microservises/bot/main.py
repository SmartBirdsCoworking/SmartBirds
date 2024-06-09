import asyncio
import logging
import sys
import datetime

from aiogram import types
from aiogram.filters import CommandStart

from bot import bot, dp
import database
from handlers import db


async def main():
    # database.init_db()
    dp.bot = bot

    @dp.message(CommandStart())
    async def cmd_start(message: types.Message):
        user = db.get_item({'username': message.from_user.username})
        if not user:
            db.put_item({'username': message.from_user.username, 'created_at': str(datetime.datetime.utcnow())})
        await message.reply("Welcome to Smart Birds! Use /generate to get your QR code.")

    await dp.start_polling(bot)

# @dp.message(Command(commands=["generate"]))
# async def cmd_generate(message: Message):
#     await message.answer("Here is your QR code. Show it to the partner to get your discount.")


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())