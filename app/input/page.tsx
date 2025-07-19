import Input from '../input/input'
import { getUserSuggestions } from '@/app/actions/getUserSuggestions'

export const metadata = {
    title: "Enter Boba",
}

export const dynamic = 'force-dynamic'

export default async function InputPage() {
    let suggestions: { shops: string[]; drinks: string[] } = {
        shops: [],
        drinks: [],
    }

    try {
        suggestions = await getUserSuggestions()
    } catch (error) {
        console.error("getUserSuggestions failed:", error)
    }

    return <Input suggestions={suggestions} />
}
