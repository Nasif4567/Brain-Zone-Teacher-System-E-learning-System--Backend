import {expect,test} from 'vitest'

//test route /course/create
test('course route', async () => {
    const response = await fetch('http://localhost:3000/course/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'Test Course',
            type: 'free',
            courseID: 111,
            contentUrl: 'https://www.google.com',
            username: 'arbaazmir',
            createdAt: '2021-12-12',
            description: 'This is a test course'
        })
    });
    const data = await response.text();
    expect(data).toBe('Course created successfully');
});

