### LINK DEPLOYMENT : [anime-collections.vercel.app](https://anime-collections.vercel.app)

<br/>

# FEATURE

## Anime List

- Show anime list with pagination @10
- Each anime item are clickable, and will
  redirect to Anime Detail page when clicked.
- Can bulk add by long press one of anime card (whitespace section -> not image, title, or "see more") -> triggered bulk session

## Collection List

- Show collection list
- There is edit (edit name and remove collection) also add new collection
- Collection name rules : not only whitespace, no special character (ex: !@#), no more than 16 character, can't duplicate with other collection

## Anime Detail

- Show anime details like image, title, rating, episodes, year, time, description, maybe can add more in future
- Can add anime to one or more collection
- Can see collection info of anime (where collection who included that anime)

## Collection Detail

- Show list of anime which add to that collection
- Can remove item from collection
- Can edit collection name

State management using @redux/toolkit and store in local storage

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
