We need to make this exact design on the press page. 

we can use a data.ts or something to pass in the publication. 

we likely want a type interface somthing like... 

interface Press { 
name: string
publicationDate: string
logo: string
}


then we'll have some logos that we show when u hoveron the articles. so if ur hovered on a row, it displays the logo where your cursor would be. which we'll add later. when we hover over the name of the publicaiton it should turn italics.

