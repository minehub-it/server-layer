import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
    try {
        const servers = await serverQueryContent(event, 'server/list').only(['address', 'platform']).find()
        return { status: 200, servers }
    } catch (err) {
        console.error('❌ Error fetching servers:', err)
        return { status: 500, message: 'Internal Server Error' }
    }
})
