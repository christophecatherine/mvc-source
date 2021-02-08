/*
 * Middleware ArticleValidPost
 */

module.exports = (req, res, next) => {
    // Si il n'y a pas d'image (file) lier dans le formulaire
    if (!req.files) {
        // Alors il redirige sur '/'
        return res.redirect('/')
    }
    next()
}