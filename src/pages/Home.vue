<template>
  <section class="px-4" v-show="false">
    <div class="text-2xl">
      <p>
        <span class="font-bold text-indigo-500">{{ user.nickName }}</span>님
      </p>
      <p>
        안녕하세요 😊
      </p>
    </div>
  </section>
  <section class="px-4 mt-4">
    <div class="text-2xl">
      <p>
        <span class="font-bold text-indigo-500">{{ user.nickName }}</span>님 에게
      </p>
      <p>
        추천해드리고 싶은
      </p>
      <p>
        의미 없는 <span class="font-bold text-indigo-500">데이터</span>
      </p>
      <p>
        <span class="font-bold">Top 5</span>
      </p>
    </div>
    <div class="mt-2">
      <ul>
        <template v-for="(item, index) in tempDataList" :key="index">
          <li class="py-2">
            <div class="text-2xl font-bold">
              {{ item.title }}
            </div>
            <div>
              {{ item.content }}
            </div>
          </li>
        </template>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useTodoStore, Todo } from '@/store/todo'

const authStore = useAuthStore()
const todoStore = useTodoStore()

const user = authStore.user

const todoList = computed<Todo[]>(() => todoStore.getAllList())

onBeforeMount(async () => {
  await todoStore.fetchTodo()

})

const tempDataList: { title: string, content: string } = [
  { title: '의미 없는 데이터 1', content: '모든 국민은 인간다운 생활을 할 권리를 가진다. 형사피고인은 유죄의 판결이 확정될 때까지는 무죄로 추정된다. 국회는 법률에 저촉되지 아니하는 범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다.' },
  { title: '의미 없는 데이터 2', content: '정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다. 국회는 법률에 저촉되지 아니하는 범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다.' },
  { title: '의미 없는 데이터 3', content: '누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. 국회나 그 위원회의 요구가 있을 때에는 국무총리·국무위원 또는 정부위원은 출석·답변하여야 하며, 국무총리 또는 국무위원이 출석요구를 받은 때에는 국무위원 또는 정부위원으로 하여금 출석·답변하게 할 수 있다.' },
  { title: '의미 없는 데이터 4', content: '대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이 임명한다. 선거와 국민투표의 공정한 관리 및 정당에 관한 사무를 처리하기 위하여 선거관리위원회를 둔다.' },
  { title: '의미 없는 데이터 5', content: '국회는 선전포고, 국군의 외국에의 파견 또는 외국군대의 대한민국 영역안에서의 주류에 대한 동의권을 가진다. 대법원은 법률에 저촉되지 아니하는 범위안에서 소송에 관한 절차, 법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다.' }
]

</script>

<style scoped lang="scss">
</style>
