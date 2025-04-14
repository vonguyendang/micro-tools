// File tools.js
const tools = [
    {
        title: "tool.pdf.name",
        description: "tool.pdf.desc",
        image: "https://images.unsplash.com/photo-1723551671614-4d20e0513d7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://pdf.dangvo.io.vn",
        tags: ["PDF", "JS", "Tool"]
    },
    {
        title: "tool.qr.name",
        description: "tool.qr.desc",
        image: "https://images.unsplash.com/photo-1600147131759-880e94a6185f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://qr.dangvo.io.vn",
        tags: ["QR", "JS", "Tool"]
    },
    {
        title: "tool.stock.name",
        description: "tool.stock.desc",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://cp.dangvo.io.vn",
        tags: ["Stock", "CP", "Tool"]
    },
    {
        title: "tool.mini_url_shortenner.name",
        description: "tool.mini_url_shortenner.desc",
        image: "https://images.unsplash.com/photo-1617518016627-d73dd26e8ab0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://url.dangvo.io.vn",
        tags: ["URL", "Shorten", "Tool"]
    },
    {
        title: "tool.url_shortenner.name",
        description: "tool.url_shortenner.desc",
        image: "https://images.unsplash.com/photo-1605701250441-2bfa95839417?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://96.ct.ws",
        tags: ["URL", "Shorten", "Tool"]
    },
    {
        title: "tool.google_one_trick.name",
        description: "tool.google_one_trick.desc",
        image: "https://images.unsplash.com/photo-1573141597928-403fcee0e056?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://g1.vnd.wuaze.com",
        tags: ["URL", "Shorten", "Tool"]
    },
    {
        title: "tool.code_formatter.name",
        description: "tool.code_formatter.desc",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://codebeautify.org/all-tools",
        tags: ["JavaScript", "Web Tool", "Productivity"]
    },
    {
        title: "tool.api_tester.name",
        description: "tool.api_tester.desc",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
        link: "https://reqbin.com/",
        tags: ["API", "Testing", "Developer Tool"]
    },
    {
        title: "tool.color_palette.name",
        description: "tool.color_palette.desc",
        image: "https://images.unsplash.com/photo-1581079949099-ea95c980d186?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
        link: "https://coolors.co/generate",
        tags: ["Design", "Colors", "UI/UX"]
    },
    {
        title: "tool.db_visualizer.name",
        description: "tool.db_visualizer.desc",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
        link: "https://dbdiagram.io/d",
        tags: ["Database", "SQL", "Visualization"]
    },
    {
        title: "tool.markdown_editor.name",
        description: "tool.markdown_editor.desc",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://stackedit.io/app#",
        tags: ["Markdown", "Writing", "Productivity"]
    },
    {
        title: "tool.password_generator.name",
        description: "tool.password_generator.desc",
        image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://passwordsgenerator.net/",
        tags: ["Security", "Password", "Tool"]
    },
    {
        title: "tool.cv_online.name",
        description: "tool.cv_online.desc",
        image: "https://images.unsplash.com/photo-1698047681432-006d2449c631?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://mau-cv.com/",
        tags: ["CV", "Online", "Tuyển dụng"]
    },
    {
        title: "tool.platzi_fake_api.name",
        description: "tool.platzi_fake_api.desc",
        image: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://fakeapi.platzi.com/",
        tags: ["API", "Fake", "Development"]
    },
    {
        title: "tool.software_testing_tools.name",
        description: "tool.software_testing_tools.desc",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://testdev.tools/",
        tags: ["Testing", "Development", "Resources"]
    },
    {
        title: "tool.sql_visualizer.name",
        description: "tool.sql_visualizer.desc",
        image: "https://images.unsplash.com/photo-1685839061205-a3ea35b7b804?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://animatesql.com/",
        tags: ["SQL", "Visualization", "Database"]
    },
    {
        title: "tool.fake_store_api.name",
        description: "tool.fake_store_api.desc",
        image: "https://images.unsplash.com/photo-1658204191944-374e8115a2de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://fakestoreapi.com/",
        tags: ["API", "Fake", "E-commerce"]
    },
    {
        title: "tool.dangvo_docs.name",
        description: "tool.dangvo_docs.desc",
        image: "https://plus.unsplash.com/premium_photo-1677402408071-232d1c3c3787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://docs.dangvo.io.vn/",
        tags: ["Tài liệu", "Hướng dẫn"]
    },
    {
        title: "tool.netflix_dangvo.name",
        description: "tool.netflix_dangvo.desc",
        image: "https://plus.unsplash.com/premium_photo-1710324884987-7c67e9986713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://netflix.dangvo.io.vn/",
        tags: ["Phim", "Giải trí", "Online"]
    },
    {
        title: "tool.bbc_news.name",
        description: "tool.bbc_news.desc",
        image: "https://images.unsplash.com/photo-1584359983106-ef9366f27454?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://bbc.dangvo.io.vn/",
        tags: ["Tin tức", "Thời sự", "BBC"]
    },
    {
        title: "tool.kafe_stories.name",
        description: "tool.kafe_stories.desc",
        image: "https://images.unsplash.com/photo-1469013078550-305e63b7c8f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://9kafe.com/",
        tags: ["Truyện", "Tiểu thuyết", "Giải trí"]
    },
    {
        title: "tool.random_profile.name",
        description: "tool.random_profile.desc",
        image: "https://images.unsplash.com/photo-1605402756180-75934835ce13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://tienichhay.net/ho-so-ngau-nhien.html",
        tags: ["Ngẫu nhiên", "Hồ sơ", "Tiện ích"]
    },
    {
        title: "tool.edu_temp_mail.name",
        description: "tool.edu_temp_mail.desc",
        image: "https://plus.unsplash.com/premium_photo-1661375025352-d5a4d633999b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://imail.edu.vn/",
        tags: ["Email", "Tạm thời", "Giáo dục"]
    },
    {
        title: "tool.online_alarm.name",
        description: "tool.online_alarm.desc",
        image: "https://plus.unsplash.com/premium_photo-1673605603709-8599cbbd1a74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://onlinealarmkur.com/vi/",
        tags: ["Đồng hồ", "Báo thức", "Online"]
    },
    {
        title: "tool.email_alias_generator.name",
        description: "tool.email_alias_generator.desc",
        image: "https://plus.unsplash.com/premium_photo-1679731353672-a94831f2b4f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://www.dangvo.io.vn/p/email-alias-generator.html",
        tags: ["Email", "Alias", "Tiện ích"]
    },
    {
        title: "tool.url_extractor.name",
        description: "tool.url_extractor.desc",
        image: "https://plus.unsplash.com/premium_photo-1683288662019-c92caea8276d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://www.dangvo.io.vn/p/xu-ly-url-tu-noi-dung.html",
        tags: ["URL", "Trích xuất", "Mạng xã hội"]
    },
    {
        title: "tool.random_name_generator.name",
        description: "tool.random_name_generator.desc",
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://www.dangvo.io.vn/p/tao-ten-viet-nam-ngau-nhien.html",
        tags: ["Ngẫu nhiên", "Tên", "Việt Nam"]
    },
    {
        title: "tool.temp_email_list.name",
        description: "tool.temp_email_list.desc",
        image: "https://plus.unsplash.com/premium_photo-1681487867978-1b83ce2625c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://www.dangvo.io.vn/p/temporary-mail-url-list.html",
        tags: ["Email", "Tạm thời", "Danh sách"]
    },
    {
        title: "tool.sensitive_word_replacer.name",
        description: "tool.sensitive_word_replacer.desc",
        image: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://www.dangvo.io.vn/p/replace-text-facebook.html",
        tags: ["Facebook", "Văn bản", "Tiện ích"]
    },
    {
        title: "tool.professional_cv.name",
        description: "tool.professional_cv.desc",
        image: "https://images.unsplash.com/photo-1698047681432-006d2449c631?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://cv.fullstack.edu.vn/",
        tags: ["CV", "Chuyên nghiệp", "Tuyển dụng"]
    },
    {
        title: "tool.dang_guidio_blog.name",
        description: "tool.dang_guidio_blog.desc",
        image: "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        link: "https://dangvo.io.vn",
        tags: ["Blog", "Guide", "Sharing"]
    }
    // Add more tools as needed (will trigger pagination if more than 6)
];

// Xuất biến tools để có thể import ở file khác
export { tools };