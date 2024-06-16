import { FaGalacticSenate } from "react-icons/fa6";
import { code } from "../models/code.js";

export const saveCode = async (req, res) => {
    const { id: userId } = req.user;
    const { title, html, css, js } = req.body;

    try {
        let existingSnippet = await code.findOne({ userId, title });

        if (existingSnippet) {
            existingSnippet.html = html;
            existingSnippet.css = css;
            existingSnippet.js = js;
            await existingSnippet.save();

            return res.send({
                success: true,
                message: "Code updated successfully",
            });
        } else {
            const ifExists = await code.findOne({ title });

            if (ifExists) {
                return res.send("Title is already taken");
            }

            const newCodeSnippet = new code({ userId, title, html, css, js });
            await newCodeSnippet.save();

            return res.send({
                success: true,
                message: "Code added successfully",
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to save code snippet',
        });
    }
};


export const viewAll = async (req, res) => {
    try {
        const view = await code.find().populate('userId');

        res.send({
            success: true,
            view
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to fetch all code snippets',
        });
    }
};

export const viewOne = async (req, res) => {
    const { id } = req.params;

    try {
        const view = await code.findById(id);

        if (!view) {
            return res.status(404).send({
                success: false,
                message: 'Code snippet not found',
            });
        }

        res.send({
            success: true,
            view
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to fetch code snippet',
        });
    }
};


export const viewYours = async (req, res) => {
    const { id: userId } = req.user;

    try {
        const viewYourSaves = await code.find({ userId }).populate('userId');

        return res.send({
            success: true,
            viewYourSaves
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to fetch your code snippets',
        });
    }
};

export const deleteCode = async (req, res) => {
    const { id: userId } = req.user;
    const { id } = req.params;

    try {
        let codeToDelete = await code.findById(id);

        if (!codeToDelete) {
            return res.status(404).send({
                success: false,
                message: 'Code snippet not found',
            });
        }

        if (codeToDelete.userId != userId) {
            return res.status(403).send({
                success: false,
                message: "You don't have access to delete this code snippet",
            });
        }

        await code.deleteOne({ _id: id });

        res.send({
            success: true,
            message: "Code snippet deleted successfully"
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to delete code snippet',
        });
    }
};

export const updateCode = async (req, res) => {
    const { id: userId } = req.user

    const { id } = req.params

    if (!id) return res.status(404).send({
        success: false,
        message: "code snippet not found"
    })

    let updateCodeSnippet = await code.findById(id)
    if (updateCodeSnippet.userId != userId) res.status(403).send("you dont't have access to update this code snippet")

    updateCodeSnippet = await code.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).send({
        success: true,
        message: "Code snippet updated successfully",
        updateCodeSnippet
    })
}
