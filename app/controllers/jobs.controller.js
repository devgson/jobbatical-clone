
/*
// create demo data
function seedDatabase(req, res){
    const demo = {
        "jobTitle" : "full stack developer",
        "date" : "2017-12-27T00:00:00.000Z",
        "companyName" : "wazo enterprises",
        "location" : "new york",
        "salary" : 200000,
        "companyDescription" : "Wazo are a new breed of networkers, researchers and event managers. We build sales, marketing, and customer service solutions with our clients—creating exceptional customer experiences and, in the process, the Greatest HR Shows on Earth. We share a vision that by 2017, HRN will be the HR network of choice across the globe. Our goal is to make the world of work a better place by connecting organizations and leaders to the information and people that inspire intelligent action and success!",
        "jobDescription" : "This role provides you with a great platform for building lifelong skills and career success and allows you to grow your own professional network. You'll meet some of the most influential thinkers and leaders on the planet at our global events.HRN is likely to be your most culturally diverse workplace, with colleagues from the US, Canada, South America, Asia and Europe working together to change the future of work, blazing the trail for others to follow.To top it all off, you will also enjoy a fun environment—we work hard but we also play hard! If we sound like a team you'd like to join, send us your application now!",
        "responsibilities" : "Building new features, writing reliable HTML, CSS, and JavaScript that works on all the browsers and devices that matter",
        "requirements" : "Skills in JavaScript, CSS3 and HTML5 development"};

    Job.remove({}, () => { // empty database then save documents
        let i = 0;
        while(i < 25){
            let job = new Job(demo);
            job.save();
            i++; 
        }
    });

    res.send('database seeded');
}

*/