import { Poppins } from "next/font/google";

export const font = Poppins({
    subsets: ['latin'],
    weight: '400'
})

// main heading: text-2xl font-semibold
// sub heading: text-2xl font-bold
// dashboard cards heading: text-lg font-bold
// dashboard content: text-2xl font-bold & font-medium
// manage company table font size: 18 & heading bold
// manage users table font size: 18 & heading bold
// create company form fields font size (field component): 14px
// create users form fields font size (field component): 14px
// inventory request  form fields font size: 10px & border radius: 4px