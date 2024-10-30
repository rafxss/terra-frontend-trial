# 🖥️ Frontend Developer Trial - Responsive Web Page with API Integration 🖥️

To access Terra's Frontend Developer Trial project in production, you can visit the following URL: [www.terra.rafaferrera.com](https://www.terra.rafaferrera.com).

### Viewing the Results

You can view the project results in several ways:

1.  **Direct Access**: Simply navigate to the provided URL in your web browser. This will display the main interface, where you can explore its features, functionalities, and how it adapts to different devices.
    
2.  **UTM Parameters**: You can modify the URL with specific UTM parameters to test different functionalities:
    
	  To refresh the data without storing it in localStorage, use `refresh=true`. If you want to use a new API (Created by me) and display a specific number of posts (for example, 8), you can enter the parameters `api=v2` and `post_count=8`.

	[www.terra.rafaferrera.com?api=v2&post_count=8&refresh=true](https://www.terra.rafaferrera.com?api=v2&post_count=8&refresh=true)

	> More details on this in the **Improvements** section.
               
By using the above methods, you can thoroughly test the Terra Test project and experience its features firsthand.

## Develop 👨🏻‍💻

### Why  Vanilla  JavaScript?  Why  Vite?

-   **Vanilla JavaScript**: Using Vanilla JavaScript means building everything from scratch, without relying on frameworks. This approach gives me full control over each feature and allows for a solution tailored to this specific challenge.
    
-   **Vite**: I chose Vite for its speed and simplicity, making development not only fast but also efficient. Vite uses the latest JavaScript features and native ES modules, which enabled faster development and deployment of this project.
    
### Installation

1.  **Clone  the  repository:**   
    ```
    git clone https://github.com/rafxss/terra-frontend-trial.git
    ``` 
2.  **Navigate  to  the  project  directory:**
    ```
    cd terra-frontend-trial
    ```
3.  **Install  the  dependencies:**
    ```
    npm install
    ```
4.  **Run  the  development  server:**
    ```
    npm run dev
    ```
    > Alternatively, you can use **npm run build** to create an optimized production build, followed by **npm run preview** to preview what the production version would look like locally.
    
5. **Open your browser** and go to `http://localhost:5173` (or the port provided in the terminal) to see the application running.

## My  Solution 💡

### Design to Code

-   **HTML Structure**: Developed a responsive HTML layout with sections for the Navbar, Hero, and Body, following the design provided in Figma.
    
-   **SCSS Styling**: Used SCSS for styling, following the BEM naming convention to enhance readability and maintainability. Variables were set up for colors, typography, and spacing to ensure a consistent design system.
    

### Handling API and localStorage

-   **API Integration**: Implemented functions to fetch data from the provided API.
    
-   **Dynamic Content**: Populated the Navbar, Hero, and Body sections dynamically based on the API response.
    
-   **Local Storage**: Utilized `localStorage` to manage the trial specifications, providing different colors and states depending on whether it is the user’s first visit.
    

## Improvements ✨


### New API and Data Management

-   Added logic to store data from the API in localStorage, reducing repeated API calls on each visit.
    
    > This can be overridden by adding `refresh=true` to the URL.
    
-   Created an additional API on my VPS with modified data, adding or removing elements to test the resilience of the design.
    
    > You can switch to this new API by adding `api=v2` to the URL.
    
-   Added an option in the API to adjust the number of posts (minimum 5, maximum 10) by including a specific header in the API request.
    
    > To enable this, include both `api=v2` and `post_count=[NUMBER]` in the URL, where `[NUMBER]` is the desired number of posts.
    

The UTM parameters can be combined as needed. 

For example, to refresh the page, use the new API, and display 8 posts, the URL would be:

[www.terra.rafaferrera.com?api=v2&post_count=8&refresh=true](https://www.terra.rafaferrera.com?api=v2&post_count=8&refresh=true)

### Pipeline Creation

-   **Build and Deployment**: Created a deployment pipeline to automate the process of deploying the project to a [production subdomain](https://www.terra.rafaferrera.com), enabling testing in a live environment. This pipeline handles the Vite build and only copies essential elements, including images for meta and Twitter cards.

### Loading Section

-   **Loader Implementation**: Added a loading indicator to inform users that data is being fetched. This addresses the time it might take for the API to retrieve all necessary data, providing visual feedback to enhance user experience.

### Design Decisions

-   **Work in Progress (WIP)**

### Mobile Menu

- **Responsive Navbar**: Developed a responsive navigation menu that adapts seamlessly to different screen sizes, enhancing usability on mobile devices. This element was not included in the Figma design, but I considered it essential for enhanced functionality.

### Error Handling

-   **Error Management**: Implemented error-handling mechanisms to display user-friendly messages when data fails to load. Specific error details are also logged in the console to assist in debugging.
    


## Next Steps 🚀

### Performance and Accessibility Analysis

I ran performance tests on sites like [PageSpeed Insights](https://pagespeed.web.dev/) and Lighthouse in the developer console. Although the results were good, there are several areas for improvement:

-   **Next-Gen Images**: Optimizing the API to retrieve images in next-gen formats (e.g., WebP or AVIF) would enhance loading times.
    
-   **Lazy Load Off-Screen Images**: Ensuring that images not initially visible, such as the error section logo or the loading gif, are deferred so they don’t impact the primary page load.
    
-   **Optimize GIFs to New Formats**: Replacing animated GIFs with MPEG4 or WebM formats can reduce network load and improve performance.
    
-   **Font Loading Optimization**: Currently, Google Fonts block the initial page render. Reducing this impact would enhance page speed.
    
-   **Accessibility Improvements**: Due to certain Figma design choices, some buttons lack adequate text-to-background contrast, which could be improved.

### Design


### Functionalities

-   **Carousel**: A carousel could be implemented that dynamically enables based on the number of posts, enhancing usability and the page’s visual design.

### More Bulletproof API Error Handling

-   **Enhanced Error Management**: Develop additional robust error-handling for API responses to ensure smooth management of edge cases, with fallback content or messages as needed.
