"use client";

import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

/**
 * QRCodeReader component for scanning QR codes using the device camera.
 *
 * @component
 * @param {string} className - Additional CSS class name(s) for the component.
 * @param {function} onQRCodeRead - Callback function to handle the scanned QR code data.
 * @returns {JSX.Element} - The QRCodeReader component.
 */
const QRCodeReader = ({ className, onQRCodeRead }) => {
    // Initialize state variables
    const scanner = useRef(null);
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);

    const onScanFail = (err) => {
        console.log(err);
        handleScan();
    };

    const handleScan = async (result) => {
        if (!result) return;
        scanner.current.stop();
        await onQRCodeRead(result?.data);
        scanner.current.start();
    };

    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl?.current, handleScan, {
                onDecodeError: onScanFail,
                // This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
                preferredCamera: "environment",
                // This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
                highlightScanRegion: true,
                // This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
                highlightCodeOutline: true,
                // A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
                overlay: qrBoxEl?.current || undefined,
            });

            // Start QR Scanner
            scanner?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        // Clean up on unmount.
        // This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        };
    }, []);

    // If "camera" is not allowed in browser permissions, show an alert.
    useEffect(() => {
        if (!qrOn)
            alert(
                "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.",
            );
    }, [qrOn]);

    return (
        <div className={"qr-reader " + className}>
            <video ref={videoEl} style={{ width: "100%" }}></video>
        </div>
    );
};

export default QRCodeReader;
