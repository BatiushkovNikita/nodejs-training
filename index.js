import App from './app';
const port = process.env.PORT || 8080;
const app = new App();

app.listen(port, () => {
   console.log('App listening on port %d!', port);
});