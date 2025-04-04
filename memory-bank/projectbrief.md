We need to map all the projects in the @public/projects/ directory to have a interface that maps their name, their year of completion, and all the photos in the associated directory. 

We can do this in a `lib/data.ts` file. 

Here's the structure of the data we to map.


``` typescript
interface Project {
    name: string;
    year: number;
    photos: string[];
}
```

All the projects will be in a grid on the `/app/projects/page.tsx`. 

Each individual will get their own URL slug. 

So we'll need to use the Next.js `generateStaticParams` function to generate the static paths for each project. 

Eg. siredesign.com/projects/No-808-2025