import Input from '../input/input'
import { getUserSuggestions } from '@/app/actions/getUserSuggestions'

export const metadata = {
    title: 'Enter Boba',
}

export const dynamic = 'force-dynamic'

export default async function InputPage() {
    let suggestions: { shops: string[]; drinks: string[] } = { shops: [], drinks: [] }
    let fetchError = ''

    try {
        suggestions = await getUserSuggestions()
    } catch (error) {
        console.error('getUserSuggestions failed:', error)
        fetchError = 'Failed to load suggestions.'
    }

    return <Input suggestions={suggestions} serverError={fetchError} />
}
