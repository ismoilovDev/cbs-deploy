import { Store } from "react-notifications-component";

type PropType = {
   title: string,
   message: string,
   type: 'success' | 'danger' | 'info' | 'default' | 'warning',
   location: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center' | 'center' | 'top-full' | 'bottom-full',
   duration: number
}

export const showNotification = ({ title, type, message, location, duration }: PropType) => {
   Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: 'top',
      container: location,
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
         duration: duration,
         onScreen: true,
         showIcon: true
      },
   });
}