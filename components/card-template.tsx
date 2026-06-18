"use client";

import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import type { CardVariant } from "@/lib/utils";

interface CardTemplateProps {
    userName: string;
    variant: CardVariant;
    onTextureReady: (dataUrl: string) => void;
    city?: string;
    date?: string;
}

export interface CardTemplateRef {
    captureTexture: () => Promise<void>;
    exportCard: () => void;
}

const CANVAS_SIZE = 1376;

const CardTemplate = forwardRef<CardTemplateRef, CardTemplateProps>(
    ({ userName, variant, onTextureReady, city, date }, ref) => {
        const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);

        const imageSrc = variant === "plain" ? "" : (variant === "dark" ? "/card-base-dark.png" : "/card-base-light.png");
        const textColor = variant === "light" ? "#000000" : "#ffffff";

        // Preload the base card image
        useEffect(() => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => setBaseImage(img);
            img.src = imageSrc;
        }, [imageSrc]);

        const captureTexture = async () => {
            const canvas = document.createElement("canvas");
            canvas.width = CANVAS_SIZE;
            canvas.height = CANVAS_SIZE;
            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            // Draw base card image (fills entire canvas)
            if (baseImage) {
                ctx.drawImage(baseImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
            } else {
                // Fallback black background if image not loaded
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            }

            // Draw user name at the bottom left area (below the geometric pattern)
            const displayName = userName || "YOUR NAME";
            ctx.fillStyle = textColor;
            ctx.font = 'normal 48px "Geist Mono", monospace';
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";

            const textX = (CANVAS_SIZE / 2) - 55;
            const textY = CANVAS_SIZE - 400;
            ctx.fillText(displayName.toUpperCase(), textX, textY);

            // Cover original V0 branding area with solid background
            const brandBgColor = variant === "light" ? "#ffffff" : "#000000";
            ctx.fillStyle = brandBgColor;
            ctx.fillRect(50, 100, 600, 220); // Cover V0 branding area (increased height)

            // Render custom branding - Line 1: "DEV"
            ctx.fillStyle = textColor;
            ctx.font = 'bold 72px "Geist Mono", monospace';
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            const brandLine1X = 100;
            const brandLine1Y = 150;
            ctx.fillText("DEV.", brandLine1X, brandLine1Y);

            // Render custom branding - Line 2: "Fullstack Developer"
            ctx.font = 'normal 42px "Geist Mono", monospace';
            const brandLine2X = 100;
            const brandLine2Y = 270; // Moved down from 240
            ctx.fillText("Fullstack Developer", brandLine2X, brandLine2Y);

            // Render city label
            if (city) {
                const cityRender = canvas.getContext("2d");

                if (!cityRender) return;

                cityRender.fillStyle = textColor;
                cityRender.font = 'normal 48px "Geist Mono", monospace';
                cityRender.textAlign = "right";
                cityRender.textBaseline = "middle";

                const cityTextX = (CANVAS_SIZE / 2) - 55;
                const cityTextY = CANVAS_SIZE - 1226;
                cityRender.fillText(city.toUpperCase(), cityTextX, cityTextY);
            }

            // Render date label
            if (date) {
                const dateRender = canvas.getContext("2d");

                if (!dateRender) return;

                dateRender.fillStyle = '#878787';
                dateRender.font = 'normal 48px "Geist Mono", monospace';
                dateRender.textAlign = "right";
                dateRender.textBaseline = "middle";

                const dateTextX = (CANVAS_SIZE / 2) - 55;
                const dateTextY = CANVAS_SIZE - 1170;
                dateRender.fillText(date.toUpperCase(), dateTextX, dateTextY);
            }


            const dataUrl = canvas.toDataURL("image/png");
            onTextureReady(dataUrl);
        };

        const exportCard = () => {
            const CROP_BOTTOM = 334;
            const EXPORT_HEIGHT = CANVAS_SIZE - CROP_BOTTOM;

            // First, create a full-size canvas to draw the complete card
            const fullCanvas = document.createElement("canvas");
            fullCanvas.width = CANVAS_SIZE;
            fullCanvas.height = CANVAS_SIZE;
            const fullCtx = fullCanvas.getContext("2d");

            if (!fullCtx) return;

            // Draw base card image (fills entire canvas)
            if (baseImage) {
                fullCtx.drawImage(baseImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
            } else {
                // Fallback black background if image not loaded
                fullCtx.fillStyle = "#000000";
                fullCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            }

            // Draw user name at the bottom left area (below the geometric pattern)
            const displayName = userName || "YOUR NAME";
            fullCtx.fillStyle = textColor;
            fullCtx.font = 'normal 48px "Geist Mono", monospace';
            fullCtx.textAlign = "right";
            fullCtx.textBaseline = "middle";

            const textX = (CANVAS_SIZE / 2) - 55;
            const textY = CANVAS_SIZE - 400;
            fullCtx.fillText(displayName.toUpperCase(), textX, textY);

            // Cover original V0 branding area with solid background
            const brandBgColor = variant === "light" ? "#ffffff" : "#000000";
            fullCtx.fillStyle = brandBgColor;
            fullCtx.fillRect(50, 100, 600, 220); // Cover V0 branding area (increased height)

            // Render custom branding - Line 1: "DEV"
            fullCtx.fillStyle = textColor;
            fullCtx.font = 'bold 72px "Geist Mono", monospace';
            fullCtx.textAlign = "left";
            fullCtx.textBaseline = "top";
            const brandLine1X = 100;
            const brandLine1Y = 150;
            fullCtx.fillText("DEV.", brandLine1X, brandLine1Y);

            // Render custom branding - Line 2: "Fullstack Developer"
            fullCtx.font = 'normal 42px "Geist Mono", monospace';
            const brandLine2X = 100;
            const brandLine2Y = 270; // Moved down from 240
            fullCtx.fillText("Fullstack Developer", brandLine2X, brandLine2Y);

            // Render city label
            if (city) {
                const cityRender = fullCanvas.getContext("2d");

                if (!cityRender) return;

                cityRender.fillStyle = textColor;
                cityRender.font = 'normal 48px "Geist Mono", monospace';
                cityRender.textAlign = "right";
                cityRender.textBaseline = "middle";

                const cityTextX = (CANVAS_SIZE / 2) - 55;
                const cityTextY = CANVAS_SIZE - 1226;
                cityRender.fillText(city.toUpperCase(), cityTextX, cityTextY);
            }

            // Render date label
            if (date) {
                const dateRender = fullCanvas.getContext("2d");

                if (!dateRender) return;

                dateRender.fillStyle = '#878787';
                dateRender.font = 'normal 48px "Geist Mono", monospace';
                dateRender.textAlign = "right";
                dateRender.textBaseline = "middle";

                const dateTextX = (CANVAS_SIZE / 2) - 55;
                const dateTextY = CANVAS_SIZE - 1170;
                dateRender.fillText(date.toUpperCase(), dateTextX, dateTextY);
            }

            // Create cropped export canvas (excludes bottom 334px)
            const exportCanvas = document.createElement("canvas");
            exportCanvas.width = CANVAS_SIZE;
            exportCanvas.height = EXPORT_HEIGHT;
            const exportCtx = exportCanvas.getContext("2d");

            if (!exportCtx) return;

            // Copy the top portion of the full canvas to the export canvas
            exportCtx.drawImage(
                fullCanvas,
                0, 0, CANVAS_SIZE, EXPORT_HEIGHT, // Source: top portion
                0, 0, CANVAS_SIZE, EXPORT_HEIGHT  // Destination: same size
            );

            // Export at full resolution
            const dataUrl = exportCanvas.toDataURL("image/png", 1.0);
            const link = document.createElement("a");
            link.download = `v0-guadalajara-${userName || "card"}.png`;
            link.href = dataUrl;
            link.click();
        };

        useImperativeHandle(ref, () => ({
            captureTexture,
            exportCard,
        }));

        // This component doesn't render anything visible
        return null;
    }
);

CardTemplate.displayName = "CardTemplate";

export default CardTemplate;
