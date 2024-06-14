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
        console.error('Error saving code snippet:', error);
        return res.status(500).send({
            success: false,
            message: 'Failed to save code snippet',
        });
    }
};


export const viewAll = async (req, res) => {
    const view = await code.find().populate('userId')

    res.send({
        success: true,
        view
    })
}

export const viewOne = async (req, res) => {
    const { id } = req.params

    const view = await code.findById(id)

    res.send({
        success: true,
        view
    })
}


export const viewYours = async (req, res) => {
    const { id: userId } = req.user;

    try {
        const viewYourSaves = await code.find({ userId });

        return res.send({
            success: true,
            message: "your codes:",
            viewYourSaves
        });
    } catch (error) {
        console.error('Error fetching code snippets:', error);
        return res.status(500).send({
            success: false,
            message: 'Failed to fetch code snippets',
        });
    }
};
