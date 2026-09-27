// Populate DOM from data.js
document.addEventListener('DOMContentLoaded',()=>{
  if(!window.data) return;
  document.getElementById('name').textContent = data.name;
  document.getElementById('title').textContent = data.title;
  document.getElementById('hero-name').textContent = data.name.split(' ')[0];
  document.getElementById('hero-title').insertAdjacentText('beforeend','');
  document.getElementById('hero-sub').textContent = data.heroSubtitle;
  document.getElementById('about-text').textContent = data.about;
  document.getElementById('photo').src = data.photo;
  document.getElementById('footer-name').textContent = data.name;
  document.getElementById('email-link').textContent = data.contact.email;
  document.getElementById('email-link').href = 'mailto:'+data.contact.email;

  const skillsList = document.getElementById('skills-list');
  skillsList.innerHTML = '';
  data.skills.forEach(s=>{
    const li = document.createElement('li'); li.textContent = s; skillsList.appendChild(li);
  });

  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = '';
  data.projects.forEach(p=>{
    const d = document.createElement('div'); d.className='project';
    d.innerHTML = `<h4><a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.title}</a></h4><p>${p.description}</p>`;
    projectsList.appendChild(d);
  });
});