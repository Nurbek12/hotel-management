import { createI18n } from 'vue-i18n'

export default createI18n({
    locale: localStorage.getItem('dashboard-lang') || 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        en: {
            nav: {
                home: "Dashboard",
                bookings: "Bookings",
                rooms: "Rooms",
                reports: "Reports",
                customers: "Customers",
                payment: "Payment",
                support: "Support",
                settings: "Settings",
                translator: "Translator",
                chat: "Chats",
                videochat: "Video Chat",
                employer: "Employees",

                language: "English",
                logout: "Log out"
            },

            dashboard: {
                card_1: "Total Rooms",
                card_2: "Booked Rooms",
                card_3: "Aviable Rooms",
                card_4: "Staffs",
                card_5: "Daily Bookings",
                card_6: "Weekly Bookings",
                card_7: "Monthly Bookings",
                card_8: "Total Payment",

                clock_1: "England",
                clock_2: "South Korea",
                clock_3: "Turkey",
                clock_4: "Russia",

                chart_title_1: "Monthly Bookings",
                chart_title_2: "Room Booking Chart",
                chart_title_3: "Exchange Rates",
                currency: "Currency",
                flag: "Flag",
                rate: "Rate"
            },

            translator: {
                page_title: "Translator",
                placeholder_1: "Translate text",
                placeholder_2: "Translated text",
            },

            login: {
                login: "Login",
                password: "Password",
                submit: "Sign In",
                title: "HOTEL MANAGEMENT",
                incorrect: "Login or Password incorrect"
            },

            rooms: {
                title: "Manage Rooms",
                room_no: "Room no",
                room_type: "Room type",
                booking: "Booking status",
                add_room: "Add Room",
                add_room_type: "Add Room Type",
            },

            booking: {
                title: "Booking Rooms",
                client: "Client",
                check_in: "Check In",
                check_out: "Check Out",
                create_booking: "Create New Booking",
                check_in_date: "Check In Date",
                check_out_date: "Check Out Date",
                total_days: "Total Days",
                rent: "Rent (Per Day)",
                total_amount: "Total Amount",
                phone: "Phone Number",
                email: "Email Address",
                address: "Residental Address",
                card_exp: "Exp. Date",
                card_num: "Card Number"
            },

            users: {
                title: "Employee management",
                employe: "Employee",
                image: "Photo",
                name: "Name, Surname",
                admin: "Admin",
                role: "Role",
            },

            settings: {
                title: "Settings"
            },
            
            price: "Price",
            connection_loader_text: "Connection",
            delete_confirm_text: "Are you sure you want to delete this item?",
            search: "Search",
            actions: "Actions",
            save: "Save",
            sum: "sum",
            discharge: "Discharge",
            nodata: "No data available",
            load_data: "Loading items",
        },
        ru: {
            nav: {
                home: "Главная",
                bookings: "Бронирования",
                rooms: "Номеры",
                reports: "Отчеты",
                customers: "Клиенты",
                payment: "Оплата",
                support: "Поддержка",
                settings: "Настройки",
                translator: "Переводчик",
                chat: "Чаты",
                videochat: "Видео Чат",
                employer: "Сотрудники",
                
                language: "Русский",
                logout: "Выйти"
            },


            dashboard: {
                card_1: "Все Комнаты",
                card_2: "Бронировано",
                card_3: "Пустые Комнаты",
                card_4: "Сотрудники",
                card_5: "Ежедневно",
                card_6: "Ежеднедельно",
                card_7: "Ежедмесячно",
                card_8: "Общий приход",

                clock_1: "Ангиля",
                clock_2: "Южная Корея",
                clock_3: "Турция",
                clock_4: "Россия",

                chart_title_1: "График Бронирование",
                chart_title_2: "Диаграмма бронирования номеров",
                chart_title_3: "Курсы валют",
                currency: "Валюта",
                flag: "Флаг",
                rate: "Курс"

            },

            translator: {
                page_title: "Онлайн Переводчик",
                placeholder_1: "Перевести текст",
                placeholder_2: "Переведенный текст",
            },

            login: {
                login: "Логин",
                password: "Пароль",
                submit: "Войти в систему",
                title: "УПРАВЛЕНИЕ ОТЕЛЬЯ",
                incorrect: "Неверный логин или пароль"
            },

            rooms: {
                title: "Управление комнатами",
                room_no: "Номер комнаты",
                room_type: "Тип номера",
                booking: "Статус бронирования",
                add_room: "Добавить комнату",
                add_room_type: "Добавить тип номера",
            },

            booking: {
                title: "Бронирование номеров",
                client: "Клиент",
                check_in: "Регистрирован",
                check_out: "Выход",
                create_booking: "Создать бронирование",
                check_in_date: "Дата заезда",
                check_out_date: "Дата выхода",
                total_days: "Всего дней",
                rent: "Аренда (в сутки)",
                total_amount: "Общая сумма",
                phone: "Номер телефона",
                email: "Электронный почта",
                address: "Адрес проживания",
                card_exp: "Срок Карты",
                card_num: "Номер карты"
            },

            users: {
                title: "Управление сотрудниками",
                employe: "Сотрудник",
                image: "Изображение",
                name: "Имя Фамилия",
                admin: "Админ",
                role: "Роль",
            },

            settings: {
                title: "Настройки"
            },
            
            price: "Цена",
            connection_loader_text: "Соединение",
            delete_confirm_text: "Вы согласны что удалить это элемент?",
            search: "Поиск",
            actions: "Управления",
            save: "Сохранить",
            sum: "сум",
            discharge: "Освободить",
            nodata: "Данные недоступны",
            load_data: "Загрузка",
        },
        uz: {
            nav: {
                home: "Bosh sahifa",
                bookings: "Bandlar",
                rooms: "Xonalar",
                reports: "Hisobotlar",
                customers: "Mijozlar",
                payment: "To'lov",
                support: "Yordam",
                settings: "Sozlamalar",
                translator: "Tarjimon",
                chat: "Yozishmalar",
                videochat: "Video Chat",
                employer: "Hodimlar",
                
                language: "O'zbekcha",
                logout: "Chiqish"
            },

            dashboard: {
                card_1: "Xonalar Soni",
                card_2: "Egallangan Xonalar",
                card_3: "Bo'sh Xonalar",
                card_4: "Xodimlar",
                card_5: "Kunlik Bronlar",
                card_6: "Haftalik Bronlar",
                card_7: "Oylik Bronlar",
                card_8: "Umumiy To'lovlar",

                clock_1: "Anglya",
                clock_2: "Janubiy Korea",
                clock_3: "Turkiya",
                clock_4: "Rossiya",

                chart_title_1: "Kunlik Bronlar soni",
                chart_title_2: "Xona bron qilish diagrammasi",
                chart_title_3: "Valyutalar kursi",
                currency: "Valyuta",
                flag: "Bayroq",
                rate: "Kurs"
            },

            translator: {
                page_title: "Onlayn Tarjimon",
                placeholder_1: "Matnni tarjima qilish",
                placeholder_2: "Tarjima qilingan matn",
            },

            login: {
                login: "Login",
                password: "Parol",
                submit: "Tizimga kirish",
                title: "MEHMONXONA BOSHQARUVI",
                incorrect: "Login yoki Parol noto'g'ri"
            },

            rooms: {
                title: "Xonalarni boshqaruvi",
                room_no: "Xona raqami",
                room_type: "Xona turi",
                booking: "Xona holati",
                add_room: "Xona Yaratish",
                add_room_type: "Xona Turi yaratish",
            },

            booking: {
                title: "Xonalarni bron qilish",
                client: "Mijoz",
                check_in: "Kirish vaqti",
                check_out: "Chiqish vaqti",
                create_booking: "Yangi bronni ro'yxatdan o'tkazish",
                check_in_date: "Ro'yxatdan o'tish sanasi",
                check_out_date: "Chiqish sanasi",
                total_days: "Jami kunlar",
                rent: "Ijara (kunlik)",
                total_amount: "Umumiy hisob",
                phone: "Telefon Raqami",
                email: "Elektron Pochtasi",
                address: "Yashash Manzili",
                card_exp: "Muddati",
                card_num: "Karta Raqami"
            },

            users: {
                title: "Xodimlarni boshqarish",
                employe: "Xodim",
                image: "Fotosurat",
                name: "Ismi familiyasi",
                admin: "Admin",
                role: "Rol",
            },

            settings: {
                title: "Sozlamalar"
            },
            
            price: "Narxi",
            connection_loader_text: "Ulanmoqda",
            delete_confirm_text: "Bu ma'lumotni o'chirishga rozimisiz?",
            search: "Qidirish",
            actions: "Boshqarish",
            save: "Saqlash",
            sum: "so'm",
            discharge: "Bo'shatish",
            nodata: "Maʼlumotlar mavjud emas",
            load_data: "Yuklanmoqda",
        }
    }
})