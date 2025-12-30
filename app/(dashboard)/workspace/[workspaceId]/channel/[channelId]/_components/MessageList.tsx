import { MessageItem } from "./message/MassageItem"


const messages = [
  {
    id:1,
    message:'hello how are you ',
    date: new Date(),
    avatar:'https://avatars.githubusercontent.com/u/170039520?v=4',
    userName:"Dhiraj Mistry"
  }
]
export function MessageList() {
  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto px-4">
          {messages.map((message) =>(
             <MessageItem key={message.id} {...message}/>
          )       
          )}
      </div>
    </div>
  )
}