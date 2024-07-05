export {default} from 'next-auth/middleware'

export const config = {matcher: ['/profile/reader', '/profile/author', '/profile/settings']}
