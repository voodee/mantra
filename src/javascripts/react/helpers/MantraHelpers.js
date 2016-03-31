
export function getMantraFromCursor(mantras, cursor) {
  // return mantras && mantras.get('items').size > 0 && mantras.get('items').get(`${cursor}`) ? 
  //   mantras.get('items').get(`${cursor}`) : undefined

  return mantras && mantras.get('items').size > 0 ? 
    mantras.get('items').get(`${cursor}`) : undefined
}

export function getCreatorFromMantra(creators, mantra) {
  return mantra && creators.size > 0 ? 
    creators.get( `${mantra.get('creator_id')}` ) : undefined
}

export function getAuthorFromMantra(authors, mantra) {
  return mantra && authors.size > 0 ? 
    authors.get( `${mantra.get('author_id')}` ) : undefined
}