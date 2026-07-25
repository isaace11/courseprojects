export class HomeController {
    static index(req, res) {
        const viewData = {};
        viewData['title'] = 'Home';
        res.render('home/index', {
            viewData
        });
    }
    static about(req, res) {
        const viewData = {};
        viewData['title'] = 'About';
        res.render('home/about', {
            viewData
        });
    }
    static contact(req, res) {
        const viewData = {};
        viewData['title'] = 'Contact';
        res.render('home/contact', {
            viewData
        });
    }
}
//# sourceMappingURL=HomeController.js.map