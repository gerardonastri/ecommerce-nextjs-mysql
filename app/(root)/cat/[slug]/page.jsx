import React from 'react'
import CategoryHero from '../_components/cat-hero';
import Card from '@/components/Card';
import ListItems from '../_components/list-items';

const page = async ({params}) => {
    const cat = (await params).slug;
    
  return (
    <main>
        <CategoryHero category={cat} />
        
            <ListItems />
        
    </main>
  )
}

export default page