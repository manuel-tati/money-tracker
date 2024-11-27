<script setup lang="ts">
import { logout } from '../../../api/endpoints/sign/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Avatar class="cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-40 ">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <RouterLink to="/account/profile" class="font-medium text-xs w-full">
            Profile
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RouterLink to="/account/change-password" class="font-medium text-xs w-full">
            Change password
          </RouterLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Button variant="ghost" size="xs" @click="logout"
          class="font-medium justify-start hover:bg-transparent px-0 text-red-700 hover:text-red-800 h-fit text-xs w-full">
          Logout
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>