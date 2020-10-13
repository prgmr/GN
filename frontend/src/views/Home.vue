<template>
    <div>

        <ul>
            <li>
                <router-link :to="{name: 'Profile'}">Profile</router-link>
            </li>
            <li>
                <router-link :to="'/calls/'">Calls</router-link>
            </li>
            <li>
                <router-link :to="'/balance/'">Balance</router-link>
            </li>
        </ul>

    </div>

</template>

<script>
    export default {
        name: 'Home',
    }
</script>
