import { HttpResponse, http } from 'msw';

const timeBuffer = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

const requestRandomSuccess = () => Math.random() <= 0.3;

const handlers: any[] = [
  http.get('/api', async () => {
    const isRequestSuccess = requestRandomSuccess();

    await timeBuffer(1000); // 강제로 응답시간을 늦춤
    if (!isRequestSuccess) {
      return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    return HttpResponse.json(
      { imgSrc: 'https://i.pinimg.com/564x/93/a6/98/93a6981f87aa7ba217ad7f38f24b0af9.jpg' },
      { status: 200 }
    );
  }),
  http.get('/api/success', async () => {
    await timeBuffer(1000); // 강제로 응답시간을 늦춤

    return HttpResponse.json(
      { imgSrc: 'https://i.pinimg.com/564x/93/a6/98/93a6981f87aa7ba217ad7f38f24b0af9.jpg' },
      { status: 200 }
    );
  }),
  http.get('/api/fail', async () => {
    await timeBuffer(1000); // 강제로 응답시간을 늦춤
    return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }),
];

export default handlers;

