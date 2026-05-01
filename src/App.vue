<script setup>
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const messages = ref([])
const name = ref('')
const content = ref('')
const loading = ref(true)
const error = ref(null)
const debugInfo = ref('')
const isAdmin = ref(false)
const adminPassword = ref('')
const loginError = ref('')

function logDebug(msg) {
  debugInfo.value += msg + '\n'
  console.log(msg)
}

async function fetchMessages() {
  try {
    logDebug('Fetching messages from Supabase...')
    logDebug('URL: ' + import.meta.env.VITE_SUPABASE_URL)
    logDebug('Key exists: ' + !!import.meta.env.VITE_SUPABASE_ANON_KEY)
    
    const { data, error: fetchError } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (fetchError) {
      logDebug('ERROR: ' + JSON.stringify(fetchError, null, 2))
      throw fetchError
    }
    
    logDebug('SUCCESS! Found ' + (data?.length || 0) + ' messages')
    messages.value = data || []
  } catch (err) {
    logDebug('ERROR: ' + err.message)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function submitMessage() {
  if (!name.value.trim() || !content.value.trim()) return
  
  const { error: insertError } = await supabase
    .from('messages')
    .insert([
      { name: name.value.trim(), content: content.value.trim() }
    ])
  
  if (insertError) {
    alert('发送失败: ' + insertError.message)
    return
  }
  
  name.value = ''
  content.value = ''
  await fetchMessages()
}

async function deleteMessage(id) {
  if (!confirm('确定要删除这条留言吗？')) return
  
  const { error: deleteError } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)
  
  if (deleteError) {
    alert('删除失败: ' + deleteError.message)
    return
  }
  
  await fetchMessages()
}

function checkAdminSession() {
  const session = sessionStorage.getItem('admin_session')
  if (session === import.meta.env.VITE_ADMIN_PASSWORD) {
    isAdmin.value = true
  }
}

function adminLogin() {
  if (adminPassword.value === import.meta.env.VITE_ADMIN_PASSWORD) {
    isAdmin.value = true
    sessionStorage.setItem('admin_session', adminPassword.value)
    adminPassword.value = ''
    loginError.value = ''
  } else {
    loginError.value = '密码错误'
  }
}

function adminLogout() {
  isAdmin.value = false
  sessionStorage.removeItem('admin_session')
}

onMounted(() => {
  fetchMessages()
  checkAdminSession()
})
</script>

<template>
  <h1>留言板</h1>
  
  <div class="debug-section">
    <h3>调试信息</h3>
    <pre>{{ debugInfo }}</pre>
  </div>
  
  <div v-if="!isAdmin" class="admin-login">
    <span>管理员登录:</span>
    <input 
      type="password" 
      v-model="adminPassword" 
      placeholder="输入管理员密码"
      @keyup.enter="adminLogin"
    />
    <button @click="adminLogin">登录</button>
    <span v-if="loginError" class="error">{{ loginError }}</span>
  </div>
  
  <div v-else class="admin-login">
    <span>已登录为管理员</span>
    <button @click="adminLogout">退出登录</button>
  </div>
  
  <div class="message-form">
    <h2>发表留言</h2>
    <input v-model="name" placeholder="你的名字" />
    <textarea v-model="content" placeholder="留言内容"></textarea>
    <button @click="submitMessage">发送</button>
  </div>
  
  <div v-if="loading" class="loading">加载中...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  
  <div v-else class="message-list">
    <div v-if="messages.length === 0" class="loading">暂无留言</div>
    <div v-for="msg in messages" :key="msg.id" class="message-card">
      <h3>{{ msg.name }}</h3>
      <div class="time">{{ new Date(msg.created_at).toLocaleString('zh-CN') }}</div>
      <p>{{ msg.content }}</p>
      <button 
        v-if="isAdmin" 
        class="delete-btn" 
        @click="deleteMessage(msg.id)"
      >
        删除
      </button>
    </div>
  </div>
</template>

<style scoped>
.debug-section {
  background: #f5f5f5;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.debug-section pre {
  font-size: 12px;
  white-space: pre-wrap;
  margin: 0;
}
</style>