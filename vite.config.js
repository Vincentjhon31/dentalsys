import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            // Use an array of entry points to ensure all pages are built
            input: [
                "resources/js/app.jsx", // Main entry point
                "resources/js/Pages/Patients/Index.jsx", // Add this for Patients page
            ],
            refresh: true,
        }),
        react(),
    ],
});
