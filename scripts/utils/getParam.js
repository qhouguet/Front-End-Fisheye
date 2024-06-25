export const getParam = () => parseInt(new URL(window.location.href).searchParams.get('id'))
