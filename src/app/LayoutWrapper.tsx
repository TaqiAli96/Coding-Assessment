import children from '@/interfaces/childrenTypes'
import React from 'react'

const LayoutWrapper: React.FC<children> = ({ children }: children) => {

    return (
        <div className='w-parentSectionWidth h-auto m-auto mt-4'>{children}</div>
    )
}

export default LayoutWrapper