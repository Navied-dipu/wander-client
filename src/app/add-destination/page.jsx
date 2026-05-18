"use client";

import { useState } from "react";
import {
    Button,
    Card,
    FieldError,
    Input,
    Label,
    TextArea,
    TextField,
} from "@heroui/react";

const AddDestinationPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setError("");
        setSuccess(false);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const destination = Object.fromEntries(formData.entries());

        console.log(destination);

        try {
            const res = await fetch(`${process.env.NEXT_SERVER_URL}/destinations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(destination),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);

            if (data.insertedId) {
                setSuccess(true);
                form.reset();
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError("Failed to add destination. Please try again.");
            }
        } catch (err) {
            setError(err.message || "Failed to add destination");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Add Destination</h1>

            {/* Success Message */}
            {success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    ✓ Destination Added Successfully
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    ✗ {error}
                </div>
            )}

            <Card className="p-8">
                <form onSubmit={onSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Destination Name */}
                        <TextField name="destinationName" isRequired>
                            <Label htmlFor="destinationName">Destination Name</Label>
                            <Input
                                id="destinationName"
                                placeholder="Bali Paradise"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Country */}
                        <TextField name="country" isRequired>
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                placeholder="Indonesia"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Category */}
                        <div className="flex flex-col gap-2">
                            <Label>Category</Label>

                            <select
                                name="category"
                                required
                                className="border p-3 rounded-xl bg-transparent"
                            >
                                <option value="">Select Category</option>
                                <option value="Beach">Beach</option>
                                <option value="Mountain">Mountain</option>
                                <option value="City">City</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Luxury">Luxury</option>
                            </select>
                        </div>
                        {/* Price */}
                        <TextField name="price" isRequired>
                            <Label htmlFor="price">Price (USD)</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="1299"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Duration */}
                        <TextField name="duration" isRequired>
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                placeholder="7 Days / 6 Nights"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Departure Date */}
                        <TextField name="departureDate" isRequired>
                            <Label htmlFor="departureDate">Departure Date</Label>
                            <Input id="departureDate" type="date" className="rounded-2xl" />
                            <FieldError />
                        </TextField>

                        {/* Image URL */}
                        <TextField name="imageUrl" isRequired>
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input
                                id="imageUrl"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Description */}
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <Label htmlFor="description">Description</Label>

                            <TextArea
                                id="description"
                                name="description"
                                placeholder="Describe the travel experience..."
                                className="rounded-2xl"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Adding Destination..." : "Add Destination"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AddDestinationPage;