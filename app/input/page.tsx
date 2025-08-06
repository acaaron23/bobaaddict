import Input from '../input/input'
import { getUserSuggestions } from '@/app/actions/getUserSuggestions'

export const metadata = {
    title: 'Enter Boba',
}

export const dynamic = 'force-dynamic'

type Suggestions = {
    shops: string[]
    drinks: string[]
}

export default async function InputPage() {
    let suggestions: Suggestions = { shops: [], drinks: [] }
    let fetchError = ''

    try {
        const result = await getUserSuggestions()

        if (result && typeof result === 'object' && 'shops' in result && 'drinks' in result) {
            suggestions = {
                shops: Array.isArray(result.shops) ? result.shops : [],
                drinks: Array.isArray(result.drinks) ? result.drinks : []
            }
        } else {
            console.warn('getUserSuggestions returned unexpected format:', result)
            fetchError = 'Failed to load suggestions - invalid data format.'
        }
    } catch (error) {
        console.error('getUserSuggestions failed:', error)

        if (error instanceof Error) {
            fetchError = 'Failed to load suggestions.'

            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            })
        } else {
            fetchError = 'Failed to load suggestions due to an unknown error.'
            console.error('Non-Error object thrown:', error)
        }
    }

    return (
        <Input suggestions={suggestions} serverError={fetchError}/>
    )
}