const simpleGreeting = "Hello {{name}}, welcome to {{company}}!";

const userInfo = "User: {{user.name}} - Email: {{user.email}} - Role: {{user.role}}";

const userList = `
  <div class="users">
    <h2>{{title}}</h2>
    {{#users}}
      <div class="user-card">
        <h3>{{name}}</h3>
        <p>{{email}}</p>
        <span class="role">{{role}}</span>
      </div>
    {{/users}}
    {{^users}}
      <p class="empty">No users found</p>
    {{/users}}
  </div>
`;



