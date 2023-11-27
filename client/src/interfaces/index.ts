export interface IUser {
    id: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    image: string,
    role: "STAFF" | "ADMIN",
    
    created_at?: Date | string,
    updated_at?: Date | string
}

export interface IRoomType {
    id: string,
    name: string,

    created_at?: Date | string,
    updated_at?: Date | string
}

export interface IRoom {
    id: string,
    name: string,
    price: number,
    booked:  boolean,
    type: IRoomType | null,
    type_id: number,
    
    created_at?: Date | string,
    updated_at?: Date | string
}

export interface IBooking {
    id: string,
    room?: string | IRoom | any,
    room_id?: number,
  
    room_type: string | IRoomType | any,
    room_type_id?: number,
  
    check_in?: any,
    check_out?: any,
  
    total_price: number,
  
    client: string,
    phone: String,
    email: String,
    address: String,
    
    created_at?: Date | string,
    updated_at?: Date | string
}

export interface IChat {
    id: string,
    name: string,
    type: "GROUP" | "PRIVATE",
    users: IUser[] | string[]
    messages: IMessage[] | string[],
    
    created_at?: Date | string,
    updated_at?: Date | string
}

export interface IMessage {
    id: string,
    text: string,
    type: string
    file: string,
    fileName: string,
    fileSize: string,
    chat: IChat | string,
    chat_id: string,
  
    sender: IUser | string,
    sender_id: string,

    created_at?: Date | string,
    updated_at?: Date | string
}