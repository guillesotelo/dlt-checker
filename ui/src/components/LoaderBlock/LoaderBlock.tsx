import { useContext } from 'react'
import { AppContext } from '../../AppContext'

type Props = {
    delay?: string
}

export const LoaderBlock = (theme: string, height: string) => {
    return (
        <div className="analyzer-loader__placeholder">
            <div
                style={{
                    height,
                    width: '100%',
                    backgroundImage: theme ?
                        'linear-gradient(110deg, #262626 8%, #4f4f4f 18%, #262626 33%)' :
                        'linear - gradient(110deg, #ececec 8 %, #f5f5f5 18 %, #ececec 33 %)',
                        margin: '.3rem 0'
                }}
                className='analyzer-loader__loading-block' />
        </div>
    )
}

export default function LoaderBlockGroup({ delay }: Props) {
    const { theme } = useContext(AppContext)

    return (
        <div className="analyzer-loader__wrapper" style={{ animationDelay: `${delay || '0'}` }}>
            <div
                className={`analyzer-loader__container${theme}`}
                style={{
                    borderColor: theme ? 'gray' : '#d3d3d361',
                    backgroundImage: '',
                    justifyContent: 'space-between'
                }}>
                {LoaderBlock(theme, '.5rem')}
                {LoaderBlock(theme, '2rem')}
                {LoaderBlock(theme, '.5rem')}
            </div>
        </div>
    )
}