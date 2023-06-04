type Props = {
  category: string
}

const matchCategoryToString = (category: string) => {
  const cat = category.toLowerCase()
  if (cat.includes('xxx')) {
    return {
      text: 'Adult',
      variant: 'secondary'
    }
  }
  if (cat.includes('movies')) {
    return {
      text: 'Movies',
      variant: 'default'
    }
  }
  if (cat.includes('music')) {
    return {
      text: 'Music',
      variant: 'default'
    }
  }
  if (cat.includes('games')) {
    return {
      text: 'Games',
      variant: 'default'
    }
  }
  if (cat.includes('software')) {
    return {
      text: 'Software',
      variant: 'default'
    }
  }
  if (cat.includes('tv')) {
    return {
      text: 'TV Show',
      variant: 'default'
    }
  }
  return {
    text: 'unknown',
    variant: 'default'
  }
}

export default function CategoryBadge({ category }: Props) {
  const cat = matchCategoryToString(category)

  return (
    <div className={`badge badge-${cat.variant}`}>
      {cat.text}
    </div>
  )
}