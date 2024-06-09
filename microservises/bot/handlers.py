import datetime

from aiogram import types
from aiogram.filters import Command, CommandStart
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo

from bot import dp, bot
from database import DynamoDB
# import qrcode
import io
import os


# Initialize DynamoDB connection
dynamodb_table = os.getenv('DYNAMODB_TABLE', 'SmartBirdsUsers')
aws_region = os.getenv('AWS_REGION', 'your-region')
db = DynamoDB(dynamodb_table, region_name=aws_region)

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    user = db.get_item({'user_id': message.from_user.id})
    if not user:
        db.put_item({'username': message.from_user.username,
                     'created_at': str(datetime.datetime.utcnow()),
                     'user_id': message.from_user.id,
                     'first_name': message.from_user.first_name,
                     'last_name': message.from_user.last_name,
                     'language_code': message.from_user.language_code
                     })

    if message.from_user.language_code == 'ru':
        button_text = "Начать"
        welcome_text = "Добро пожаловать в Smart Birds Bot! Откройте для себя интересные места для посещения в Кушадасы и получите скидку 10% в наших партнерских заведениях. Ищете лучшие рестораны, кафе или коворкинг? У нас есть все это. Просто создайте QR-код и покажите его персоналу, чтобы получить скидку. Нажмите кнопку «Начать»"
    elif message.from_user.language_code == 'tr':
        button_text = "Başlat"
        welcome_text = "Smart Birds Bot'a hoş geldiniz! Kuşadası'nda ziyaret edilecek ilginç yerleri keşfedin ve partnerlerimizde %10 indirimden yararlanın. En iyi restoranları, kafeleri veya ortak çalışma alanlarını mı arıyorsunuz? Hepsini bizde bulabilirsiniz. QR kodu oluşturun ve indirim almak için personelimize gösterin. “Başlat” düğmesine tıklayın"
    else:
        button_text = "Start"
        welcome_text = "Welcome to the Smart Birds Bot! Discover interesting places to visit in Kusadasi and enjoy a 10% discount at our partner locations. Whether you're looking for the best restaurants, cafes, or co-working space, we've got you covered. Simply generate a QR code and show it to the staff to receive your discount. Click the “Start” button"

    smart_birds_webappinfo = WebAppInfo(
        url= f"https://smartbirds.com.tr/bot/list?user_id={message.from_user.id}&username={message.from_user.username}&first_name={message.from_user.first_name}&last_name={message.from_user.last_name}&language_code={message.from_user.language_code}"
    )

    smart_birds_menubutton = types.MenuButtonWebApp(
        text=button_text,
        web_app=smart_birds_webappinfo
    )

    # Create a reply keyboard
    keyboard = ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(text=button_text, web_app=smart_birds_webappinfo),
            ],
        ],
        resize_keyboard=True,
    )

    # Send a message with the keyboard
    await bot.send_message(message.chat.id, welcome_text, reply_markup=keyboard)
    await bot.set_chat_menu_button(chat_id=message.chat.id, menu_button=smart_birds_menubutton)

# @dp.message(Command(commands=['generate']))
# async def cmd_generate(message: types.Message):
#     user = db.get_item({'username': message.from_user.username})
#     if not user:
#         await message.reply("Please use /start to register first.")
#         return
#     qr_data = f'https://yourserver.com/validate?user_id={user["username"]}'
#     qr = qrcode.QRCode(
#         version=1,
#         error_correction=qrcode.constants.ERROR_CORRECT_L,
#         box_size=10,
#         border=4,
#     )
#     qr.add_data(qr_data)
#     qr.make(fit=True)
#     img = qr.make_image(fill='black', back_color='white')
#     buf = io.BytesIO()
#     img.save(buf)
#     buf.seek(0)
#     await message.reply_photo(buf, caption="Here is your QR code. Show it to the partner to get your discount.")

@dp.message()
async def handle_all_other_messages(message: types.Message):
    print(f"Unhandled message: {message.text}")
    print(f"User ID: {message.from_user.id}")
    print(f"Username: {message.from_user.username}")
    print(f"First name: {message.from_user.first_name}")
    print(f"Last name: {message.from_user.last_name}")
    print(f"Language code: {message.from_user.language_code}")